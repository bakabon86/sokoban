import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {isCheck: false};
  }

  checkClicked = async () => {
    await this.setState(prevState => ({
      isCheck: !prevState.isCheck,
    })); // setState is async function.

    // Call function type prop with return values.
    this.props.clicked && this.props.clicked(this.props.value, this.state.isCheck);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.checkClicked} style={this.props.style}>
        <View style={{
          height: 24,
          width: 24,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            height: 12,
            width: 12,
            backgroundColor: this.state.isCheck ? '#000' : '#FFF',
          }} />
        </View>
      </TouchableOpacity>
    )
  }
}


const products = [
  {
    id: 1
  },
  {
    id: 2
  }, 
];


export default class CheckBoxScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
    }
  }

  toggleCheckBox = (id, isCheck) => {
    let { checkSelected } = this.state;
    if (isCheck) {
      checkSelected.push(id);
    } else { // remove element
      var index = checkSelected.indexOf(id);
      if (index > -1) {
        checkSelected.splice(index, 1);
      }
    }

    this.setState({ checkSelected });

    alert(this.state.checkSelected); // logging
  }

  render() {
    const checkboxs = products.map(({id}) =>
      <CheckBox style={{marginTop: 50,}}key={id} value={id} clicked={(id, isCheck) => this.toggleCheckBox(id, isCheck)}></CheckBox>
    )

    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        {checkboxs}
      </View>
    );
  }
}