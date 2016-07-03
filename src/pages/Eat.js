import React from 'react';
import ReactDOM from 'react-dom';
import jquery from 'jquery';

import {Spot} from '../components/Spot';
import {Map, Marker, InfoWindow} from 'google-maps-react'
import Profile from '../components/Profile'

import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const styles = {
  map: {
    zIndex: 0,
    width: "100%",
    height: 400,
  }
};

const lang_en = {
  true: {
      budget: 'Budget:',
      japan: 'japan',
      italian: 'italian',
      french: 'french',
      chinese: 'chinese',
      quite: 'quite',
      full_of_life: 'full_of_life',
      romantic: 'romantic',
      family: 'family',
      all_you_can_eat: 'all_you_can_eat',
      spicy: 'spicy'
  },
  false: {
      budget: '平均予算:',
      japan: '日本食',        // 1
      italian: 'イタリアン',  // 2
      french: 'フランス料理', // 4
      chinese: '中華料理',    // 8
      quite: '静かな',                // 1
      full_of_life: '賑やかな',       // 2
      romantic: 'ロマンチックな',     // 4
      family: '家族向けな',           // 8
      all_you_can_eat: '食べ放題な',  // 16
      spicy: '辛い'
  }
}

const parse_country = (value) => {
  let country = '';
  value = parseInt(value, 10);
  if ((value & 0x01) == 0x01) {
    country = country + '日本食';
  }
  if ((value & 0x02) == 0x02) {
    country = country + 'イタリアン';
  }
  if ((value & 0x04) == 0x04) {
    country = country + 'フランス料理';
  }
  if ((value & 0x08) == 0x08) {
    country = country + '中華料理';
  }
  return country;
}

const parse_mood = (value) => {
  let mood = '';
  value = parseInt(value, 10);
  if ((value & 0x01) == 0x01) {
    mood = mood + '静かな'
  }
  if ((value & 0x02) == 0x02) {
    mood = mood + '賑やかな'
  }
  if ((value & 0x04) == 0x04) {
    mood = mood + 'ロマンチックな'
  }
  if ((value & 0x08) == 0x08) {
    mood = mood + '家族向けな'
  }
  if ((value & 0x10) == 0x10) {
    mood = mood + '食べ放題な'
  }
  if ((value & 0x20) == 0x20) {
    mood = mood + '辛い'
  }
  return mood;
}

const seen_table = {
  'lunch': 'ランチのお店',
  'dinner': 'ディナーレストラン',
  'coffee': 'カフェ',
  'drink': 'お酒を飲む場所'
};

export default class Eat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isEnglish: false,
      latlng: {lat: this.props.location.query.lat, lng:this.props.location.query.lng},
      freeword: this.props.location.query.freeword,
      seen: this.props.location.query.seen,
      country: this.props.location.query.country,
      mood: this.props.location.query.mood
    }
  }

  componentDidMount() {
    jquery.ajax({
      type: 'get',
      url: './eat' + this.props.location.search
    }).done((data) => {
      this.setState({data: data});
    });
  }

  componentDidUpdate() {
    if (this.state.isEnglish) {
      ReactDOM.findDOMNode(this).scrollIntoView();
    }
  }

  onMarkerClick(name) {
    console.log(name);
  }

  onTranslationButtonClick(event) {
    this.setState({
      data: {rest: [this.state.data.rest[event]]},
      isEnglish: !this.state.isEnglish
    });
    if (this.state.isEnglish) {
      jquery.ajax({
        type: 'get',
        url: './eat?freeword=' + this.state.freeword + '&lat=' + this.state.latlng.lat + '&lng=' + this.state.latlng.lng
      }).done((data) => {
        this.setState({
          data: data
        });
      });
    }
  }

  mapClicked(mapProps, map, clickEvent) {
    this.setState({
      latlng:{lat: clickEvent.latLng.lat().toString(), lng:clickEvent.latLng.lng().toString()}
    })
  }

  onMapDragend(mapProps, map) {
    if (!this.state.isEnglish) {
      jquery.ajax({
        type: 'get',
        url: './eat?freeword=' + this.state.freeword + '&lat=' + map.center.lat() + '&lng=' + map.center.lng()
      }).done((data) => {
        this.setState({
          data: data,
          latlng: {
            lat: map.center.lat(),
            lng: map.center.lng()
          }
        });
      });
    }
  }

  render() {

    let restran_list = ""
    let marker_list = ""

    if (this.state.data == null) {
      return null;
    }

    const rest = this.state.data.rest;
    if (rest != null) {
      restran_list = rest.map((item, i) => {
        let img = ( <img className='spot_item_image' src='images/no_image.svg' /> )
        let pr = '';
        let opentime = "";
        let budget = "";
        let credit_card = "";
        if (typeof(item.image_url.shop_image1) !== 'object') {
          img = (
            <img className='spot_item_image' src={item.image_url.shop_image1} />
          )
        } else if (typeof(item.image_url.shop_image2) !== 'object') {
          img = (
            <img className='spot_item_image' src={item.image_url.shop_image2} />
          )
        }
        if (typeof(item.opentime) !== 'object') {
          opentime = <div className='spot_item_opentime'>{item.opentime}</div>
        }
        if (typeof(item.pr.pr_long) !== 'object') {
          let message = item.pr.pr_long;
          const message_limit = 100
          if (message.length > message_limit) {
            message = message.substring(0, message_limit) + '...';
          }
          pr = <div className='spot_item_pr'>{message}</div>
        }
        if (typeof(item.budget) !== 'object') {
          budget = <div className='spot_item_budget'>{lang_en[this.state.isEnglish].budget + item.budget}円</div>
        }

        return (
          <Card className='spot_item' onClick={this.onTranslationButtonClick.bind(this, i)} key={i}>
            <CardText>
              <div className="spot_custom_image">
                {img}
              </div>
              <div className="spot_custom_right">
                <div className="spot_custom_name">
                  {item.name}
                </div>
                <div className="spot_custom_pr">
                  {pr}
                </div>
                <div className="spot_custom_opentime">
                  {opentime}
                </div>
                <div className="spot_custom_budget">
                  {budget}
                </div>
              </div>
            </CardText>
          </Card>
        )
      });
    }

    let map_message = 'オススメのお店の場所はどこの辺りですか？';
    let where_message = 'そのお店はこの中のどれですか？';
    if (this.state.isEnglish) {
      map_message = '';
      where_message = '';

      marker_list = rest.map((item, i) => {
        return (
          <Marker onClick={this.onMarkerClick}
                  name={item.name}
                  position={{lat: item.latitude, lng:item.longitude}}
                  key={i} />
        )
      })
    }

    const country = parse_country(this.state.country);
    const mood = parse_mood(this.state.mood);
    const seen = this.state.seen;

    var profile = {
      "user_name": "Tom",
      "age": "28",
      "day": "2",
      "from": "カリフォルニア",
      "hobby": ['ダーツ', 'マラソン']
    }

    const message = (
      <div className="prof">初めまして！僕の名前は<span className="bold">{profile['user_name']}</span>といいます。
      <span className="bold">{profile['age']}歳</span>で、<span className="bold">{profile['day']}</span>日前に<span className="bold">{profile['from']}</span>から日本に来ました。
      趣味は<span className="bold">{profile['hobby'][0]}</span>と<span className="bold">{profile['hobby'][1]}</span>です。<br />
      僕は今<span className="bold">{mood + country + seen}</span>レストランを探しています。
      もしオススメのお店を知っていたら、ぜひ教えてください！
    </div>)

    const question1 = 'オススメのお店の場所はどこの辺りですか？';

    const question2 = 'そのお店はこの中のどれですか？';

    return(
      <div className='eat card'>
        <Profile name='Tom Gibson'
                 message={message}
                 show={!this.state.isEnglish} />
        <div className='map_message bold'>
          {map_message}
        </div>
        <div className='map'>
          <Map style={styles.map}
               google={window.google}
               zoom={17}
               onDragend={this.onMapDragend.bind(this)}
               center={this.state.latlng}
               initialCenter={this.state.latlng}>
               {marker_list}
          </Map>
        </div>
        <div className='where_message bold'>
          {where_message}
        </div>
        <div className='spot_list'>
          {restran_list}
        </div>
      </div>
    );
  }
}
