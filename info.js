import React, {Component} from 'react';
import {View, ListView, Text} from 'react-native';
import MyButton from './src/js/MyButton';

var InfoScene = React.createClass({
    getInitialState: function () {
        const tusmovimientos = ['El buen movimiento', 'pito', 'ggmnndz', 'jvltbl'];
        const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        return {dataSource: ds.cloneWithRows(tusmovimientos)};

    },

    _renderRow: function (rowData) {
        return(
            <View>
                <Text>{rowData}</Text>
            </View>
        )
    },

    render:function(){
        return (
            <View style = {{flex: 1, margin: 10}}>
                <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} />
                <MyButton onPress={this.props.onBack} text={"Volver"} />
            </View>
        )
    }
});

export default InfoScene;
