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
        }
        var itemDim;

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true, //Detection of event (touch interaction) enabled.
            onPanResponderStart: (evt, gestureState) => { //To apply only at the begining of the interaction.
                //console.log('Id : '+ props.itemId);
                props.setIdSelected(props.itemId);
            },
            onPanResponderMove: (evt, gestureState) => { //To apply all along the interaction
                //console.log(gestureState.y0);
                let touches = evt.nativeEvent.touches;
                if (touches.length == 1) {
                    var realHeight = this.itemDim.height + 8;
                    var semiHeight = realHeight/2;
                    var move = Math.floor(gestureState.dy/semiHeight);
                    //console.log(move);
                    if (move)
                    {
                        props.swapLists(move);
                    }
                    //var nbIndex;
                    this.setState({
                    topPosition: touches[0].pageY - gestureState.y0,
                    })
                }
            },
            onPanResponderEnd: (evt, gestureState) => {  ////To apply at the end of the interaction
                var realHeight = this.itemDim.height + 8;
                var semiHeight = realHeight/2;
                var deltaAbs = Math.abs(gestureState.dy); //Absolute value of the distance run by the component compared to its original coordonate y0.
                var nbIndex;

                this.setState({
                    topPosition: 0,
                    }) 

                /*- Component has to run at least the half of its height to change index.
                - If it is the case we add 1 to the index move and substract height/2 to the considered distance run.
                - Then we computed the equivalent distance in terms of entire item height
                - If this latter value is not an integer, we add the total found to the index move.
                - Else, the total-1 .*/

                /*if (Math.floor(deltaAbs/semiHeight))
                    {
                        nbIndex = 1 + Math.floor((deltaAbs - semiHeight)/realHeight) - 1 + ((deltaAbs - semiHeight)%realHeight > 0);
                        
                        //console.log(nbIndex); //Display the absolute number of index the item has to move.
                        
                        //props.swapLists(nbIndex);
                        this.setState({
                            topPosition: 0,
                            }) 
                    }
                else {
                    console.log(0);
                    this.setState({
                        topPosition: 0,
                        
                    })
                }*/
                /*var realHeight = this.itemDim.height + 8;
                var semiHeight = realHeight/2;
                var move = Math.floor(gestureState.dy/semiHeight);
                //console.log(move);
                if (move)
                    {
                        props.swapLists(move);
                    }*/
            },
        })
    }

    render() {
        return (
            <View
            onLayout = {(event) => {
                this.itemDim = event.nativeEvent.layout; //add in itemDim the dimensions and the particulars.
            }}
            {...this.panResponder.panHandlers}
            style={[styles.item,this.props.transmit, { top: this.state.topPosition}]}
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