import React, { useState, useEffect, setState, Component } from "react";
import { View, Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, PanResponder, Dimensions  } from "react-native";
import { Icon } from 'react-native-elements'
import { Button } from 'react-native'
import DialogInput from 'react-native-dialog-input';
import { connect } from 'react-redux'
import * as Random from 'expo-random';
import { mapStateToProps, mapDispatchToProps } from '../redux/actions/listesActions'
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

class PanMoveHandler extends Component {

    constructor(props) {
        super(props)
        this.state = {
          topPosition: 0, //Value of the Y axe position of the item.
          myPadding: 20,
        }
        var itemDim;
        var time0

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => { //Detection of event (touch interaction) enabled. 
                return true;
            }, 
            onPanResponderStart: (evt, gestureState) => { //To apply only at the begining of the interaction.
                this.time0 = evt.timeStamp;
                setTimeout(
                () => {
                    this.setState({
                        myPadding: 40,
                        })
                    }, 
                700);
                props.setIdSelected(props.itemId);
            },
            onPanResponderMove: (evt, gestureState) => { //To apply all along the interaction
                let touches = evt.nativeEvent.touches;
                //console.log(evt.timeStamp);
                if (touches.length == 1) { 
                    if (evt.timeStamp - this.time0 >= 500){  
                        this.setState({
                        topPosition: touches[0].pageY - gestureState.y0,
                        })
                    }
                }
            },
            onPanResponderEnd: (evt, gestureState) => {  ////To apply at the end of the interaction
                var realHeight = this.itemDim.height + styles.item.marginVertical;
                var semiHeight = realHeight/2;
                var deltaAbs = Math.abs(gestureState.dy); //Absolute value of the distance run by the component compared to its original coordonate y0.
                var nbIndex;

                /*- Component has to run at least the half of its height to change index.
                - If it is the case we add 1 to the index move and substract height/2 to the considered distance run.
                - Then we computed the equivalent distance in terms of entire item height
                - If this latter value is not an integer, we add the total found to the index move.
                - Else, the total-1 .*/
                
                //console.log(styles.item.marginVertical);
                if (evt.timeStamp - this.time0 < 500)
                {
                    setTimeout(
                        () => {
                            this.setState({
                                myPadding: 20,
                                })
                            }, 
                        705 - (evt.timeStamp - this.time0) );//- evt.timeStamp);
                    props.myPress();
                }
                else if (Math.floor(deltaAbs/semiHeight))
                    {
                        nbIndex = 1 + Math.floor((deltaAbs - semiHeight)/realHeight) - 1 + ((deltaAbs - semiHeight)%realHeight > 0);
                        
                        //console.log(Math.pow(-1,(gestureState.dy <= 0))*nbIndex); //Display the absolute number of index the item has to move.
                        
                        var final = Math.pow(-1,(gestureState.dy <= 0))*nbIndex;

                        props.swapLists(final);
                        
                        this.setState({
                            topPosition: 0,
                            myPadding: 20,
                            }) 
                    }
                else {
                    this.setState({
                        topPosition: 0,
                        myPadding: 20,
                    })
                }
            },
        })
    }

/*<View
            onLayout = {(event) => {
                this.itemDim = event.nativeEvent.layout; //add in itemDim the dimensions and the particulars.
            }}
            {...this.panResponder.panHandlers}
            style={[styles.item,this.props.transmit, { top: this.state.topPosition}]}
            >
            {this.props.children} 
            </View>*/

/*<TouchableOpacity
            onLayout = {(event) => {
                this.itemDim = event.nativeEvent.layout; //add in itemDim the dimensions and the particulars.
            }}
            {...this.panResponder.panHandlers}
            onPress={() => {}}
            style={[styles.item,this.props.transmit, { top: this.state.topPosition}]}
            >
            {this.props.children} 
            </TouchableOpacity>*/

    render() {
        return (
            <View
            onLayout = {(event) => {
                this.itemDim = event.nativeEvent.layout; //add in itemDim the dimensions and the particulars.
            }}
            {...this.panResponder.panHandlers}
            style={[styles.item,this.props.transmit, { top: this.state.topPosition, padding: this.state.myPadding}]}
            >
            {this.props.children} 
            </View>
    )
}

}

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
});

export default connect(mapStateToProps, mapDispatchToProps)(PanMoveHandler)