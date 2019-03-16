import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

var focus = 1;

var letters_lower = [
  [{key:'q'}, {key:'a'}, {key:'.'}],
  [{key:'w'}, {key:'s'}, {key:'z'}],
  [{key:'e'}, {key:'d'}, {key:'x'}],
  [{key:'r'}, {key:'f'}, {key:'c'}],
  [{key:'t'}, {key:'g'}, {key:'v'}],
  [{key:'y'}, {key:'h'}, {key:'b'}],
  [{key:'u'}, {key:'j'}, {key:'n'}],
  [{key:'i'}, {key:'k'}, {key:'m'}],
  [{key:'o'}, {key:'l'}, {key:'!'}],
  [{key:'p'}, {key:'?'}, {key:','}]
];

var letters_upper = [
  [{key:'Q'}, {key:'A'}, {key:'.'}],
  [{key:'W'}, {key:'S'}, {key:'Z'}],
  [{key:'E'}, {key:'D'}, {key:'X'}],
  [{key:'R'}, {key:'F'}, {key:'C'}],
  [{key:'T'}, {key:'G'}, {key:'V'}],
  [{key:'Y'}, {key:'H'}, {key:'B'}],
  [{key:'U'}, {key:'J'}, {key:'N'}],
  [{key:'I'}, {key:'K'}, {key:'M'}],
  [{key:'O'}, {key:'L'}, {key:'!'}],
  [{key:'P'}, {key:'?'}, {key:','}]
];

export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        leftColumn: letters_lower[0],
        centerColumn: letters_lower[1],
        rightColumn: letters_lower[2],
        text: 'Type a letter!',
        currCarousel: letters_lower,
        shift: true
      }
  }

  onSwipeUp(gestureState) {
    this.setState({text: '\n\n\nYou swiped up!!'});
  }

  onSwipeLeft(gestureState) {
    focus = focus + 1;
    if (focus == this.state.currCarousel.length){
      focus = 0;
    }
    this.setState({text: '\n\n\nYou swiped left!' + focus});
    
    if (focus == 0) {
      this.setState({leftColumn: this.state.currCarousel[this.state.currCarousel.length - 1],
                     centerColumn: this.state.currCarousel[0],
                     rightColumn: this.state.currCarousel[1]});
    } else if (focus == this.state.currCarousel.length -1) {
      this.setState({leftColumn: this.state.currCarousel[focus - 1],
        centerColumn: this.state.currCarousel[focus],
        rightColumn: this.state.currCarousel[0]});
    } else {
      this.setState({leftColumn: this.state.currCarousel[focus -1],
                     centerColumn: this.state.currCarousel[focus],
                     rightColumn: this.state.currCarousel[focus + 1]});
    }
  }
   
  onSwipeRight(gestureState) {
    focus = focus - 1;
    if (focus < 0) {
      focus = this.state.currCarousel.length - 1;
    }
    this.setState({myText: '\n\n\nYou swiped right!' + focus});
    
    if (focus == 0) {
      this.setState({leftColumn: this.state.currCarousel[this.state.currCarousel.length - 1],
                     centerColumn: this.state.currCarousel[0],
                     rightColumn: this.state.currCarousel[1]});
    } else if (focus == this.state.currCarousel.length -1) {
      this.setState({leftColumn: this.state.currCarousel[focus - 1],
        centerColumn: this.state.currCarousel[focus],
        rightColumn: this.state.currCarousel[0]});
    } else {
      this.setState({leftColumn: this.state.currCarousel[focus -1],
                     centerColumn: this.state.currCarousel[focus],
                     rightColumn: this.state.currCarousel[focus + 1]});
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'powderblue', justifyContent: "center", alignItems:"center"}}>
          <Text>{this.state.text}</Text>
        </View>

        <GestureRecognizer style={{flex:1, flexDirection: 'row'}}
                onSwipeUp={(state) => this.onSwipeUp(state)}
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}>
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
        </GestureRecognizer>
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
