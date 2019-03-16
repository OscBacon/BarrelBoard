import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        leftColumn: [{key:'a'}, {key:'b'}, {key:'c'}],
        centerColumn: [{key:'a'}, {key:'b'}, {key:'c'}],
        rightColumn: [{key:'a'}, {key:'b'}, {key:'c'}]
      }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'powderblue', justifyContent: "center", alignItems:"center"}}>
          <Text>Hi</Text>
        </View>

        <View style={{flex: 1, flexDirection:'row'}}>
          <View style={styles.peripheralView}>
            <FlatList
              data = {this.state.leftColumn}
              renderItem = {({item}) => 
                <View style={styles.charView}>
                  <Text style={{fontSize: 30}}>{item.key}</Text>
                </View>}
              style={{padding:'10%'}}
            />

            <View style={styles.shiftShapeView}>
              <Image style={{resizeMode: 'contain'}} source={require('./assets/uparrow.png')} />
            </View>
          </View>
          <View style={styles.focusView}>
            <FlatList 
              data = {this.state.centerColumn}
              renderItem = {({item}) => 
                <View style={styles.charView}>
                  <Text style={{fontSize: 30}}>{item.key}</Text>
                </View>}
              style={{padding:'10%'}}
            />
          </View>
          <View style={styles.peripheralView}>
            <FlatList
                data = {this.state.rightColumn}
                renderItem = {({item}) => 
                  <View style={styles.charView}>
                    <Text style={{fontSize: 30}}>{item.key}</Text>
                  </View>}
                style={{padding:'10%'}}
              />

            <View style={styles.menuShapeView}>
              <Image style={{resizeMode: 'contain'}} source={require('./assets/3dots.png')} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusView: {
    flex: 2,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:  'row'
  },
  peripheralView: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    padding:'1%'
  },
  charView: {
    padding: '15%', 
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    flex:1
  },
  shiftShapeView: {
    width: 80,
    height: 80,
    borderRadius: 80/2,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: '10%' 
  },
  menuShapeView: {
    width: 80,
    height: 80,
    borderRadius: 80/2,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: '10%'
  }
});
