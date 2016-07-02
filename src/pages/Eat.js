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
      budget: 'Budget:'
  },
  false: {
      budget: '平均予算:'
  }
}

export default class Eat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isEnglish: false,
      latlng: {lat: this.props.location.query.lat, lng:this.props.location.query.lng},
      freeword: this.props.location.query.freeword
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
          pr = <div className='spot_item_pr'>{item.pr.pr_long}</div>
        }
        if (typeof(item.budget) !== 'object') {
          budget = <div className='spot_item_budget'>{lang_en[this.state.isEnglish].budget + item.budget}円</div>
        }

        return (
          <Card className='spot_item' onClick={this.onTranslationButtonClick.bind(this, i)} key={i}>
            <CardHeader title={item.name}
                        subtitle={pr}/>
            <CardText>
              {img}
              {opentime}
              {budget}
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

    var profile = {
      "user_name": "Tom",
      "age": "28歳",
      "day": "2",
      "from": "カリフォルニア",
      "hobby": ['ダーツ', 'マラソン'],
      "search": ['家族で行ける', '静かな', '日本食', 'ディナーレストラン']
    }

    const message = (
      <div className="prof">初めまして！僕の名前は<span id="user_name">{profile['user_name']}</span>といいます。
      <span id="age">{profile['age']}歳</span>で、<span id="day">{profile['day']}</span>日前に<span id="from">{profile['from']}</span>から日本に来ました。
      趣味は<span id="hobby1">{profile['hobby'][0]}</span>と<span id="hobby2">{profile['hobby'][1]}</span>です。
      僕は今<span id="search1">{profile['search'][0]}</span>
            <span id="search2">{profile['search'][1]}</span>
            <span id="search3">{profile['search'][2]}</span>
            <span id="search4">{profile['search'][3]}</span>を探しています。
      もしオススメのお店を知っていたら、ぜひ教えてください！
    </div>)

    const question1 = 'オススメのお店の場所はどこの辺りですか？';

    const question2 = 'そのお店はこの中のどれですか？';

    return(
      <div className='eat card'>
        <Profile name='Tom Gibson'
                 message={message}
                 show={!this.state.isEnglish} />
        <div className='map_message'>
          {map_message}
        </div>
        <div className='map'>
          <Map style={styles.map}
               google={window.google}
               zoom={17}
               onDragend={this.onMapDragend.bind(this)}
               initialCenter={this.state.latlng}>
               {marker_list}
          </Map>
        </div>
        <div className='where_message'>
          {where_message}
        </div>
        <div className='spot_list'>
          {restran_list}
        </div>
      </div>
    );
  }
}
