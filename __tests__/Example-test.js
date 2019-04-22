import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../src/screens/Login';
import formPushScreen from '../src/screens/formPush';

// test('renders correctly', () => {
//   const tree = renderer.create(<LoginScreen />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it('app calculateSum returns value', () => {
//     let componentInstance = renderer.create(<App />).getInstance();
//     result = componentInstance.calculatSum(1,3);
//     expect(result["props"]["children"]).toEqual(4);
//   });

// it('should return an array containing the populated options', () => {
//     const teams = [
//       { "name": "A", "id": 1 },
//       { "name": "B", "id": 2 }
//     ];
//     const result = Helper.buildOptions(teams);
  
//     // Check if option exist and have length of 2
//     expect(result).toBeTruthy();
//     expect(result).toHaveLength(2);
  
//     // Check if the options is as expected
//     expect(result[0]).toEqual(<option key="optId1" value={1}>A</option>);
//     expect(result[1]).toEqual(<option key="optId2" value={2}>B</option>);
//   });

test('check user', () => {
    let componentInstance = renderer.create(<LoginScreen />).getInstance();
    result = componentInstance.checkUser();    
    expect(result).toEqual(expect.objectContaining({}));
});
it('Form Push render', () => {
    const tree = renderer.create(<formPushScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});
it('works', () => {
    expect(1).toBe(1);
});