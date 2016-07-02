//
//  OKViewController.swift
//  Deepr
//
//  Created by DegawaIkuo on 7/2/16.
//  Copyright © 2016 ikuwow. All rights reserved.
//

import UIKit

class OKViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
         self.title = "Deepr!"
        self.navigationController?.setNavigationBarHidden(true, animated: true)

        // Do any additional setup after loading the view.
    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)
        
        let okAlertController: UIAlertController = UIAlertController(
            title: "Alert",
            message: "Please show this screen and talk.",
            preferredStyle: .Alert
        )
        let okAction: UIAlertAction = UIAlertAction(
            title: "Default",
            style: UIAlertActionStyle.Default,
            handler:{
                (action:UIAlertAction!) -> Void in
                print("Default")
        })
        okAlertController.addAction(okAction)
        
        self.navigationController?.pushViewController(okAlertController, animated: true)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        self.navigationController?.setNavigationBarHidden(true, animated: true)
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
