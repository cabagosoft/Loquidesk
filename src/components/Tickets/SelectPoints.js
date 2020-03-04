import React, { Component, SafeAreaView, Button } from 'react';
import PickerModal from 'react-native-picker-modal-view';

const list = [
	{Id: 1, Name: 'Test1 Name', Value: 'Test1 Value'},
	{Id: 2, Name: 'Test2 Name', Value: 'Test2 Value'},
	{Id: 3, Name: 'Test3 Name', Value: 'Test3 Value'},
	{Id: 4, Name: 'Test4 Name', Value: 'Test4 Value'}
]

export default class example extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedItem: {}
		}
	}

	selected(selected) {
		this.setState({
			selectedItem: selected
		})
	}

    render() {
        return (
          <SafeAreaView style={{ flex: 1, justifyContent: 'center', marginHorizontal: 20 }}>
          <PickerModal
            renderSelectView={(disabled, selected, showModal) =>
              <Button disabled={disabled} title={'Show me!'} onPress={showModal} />
            }
            onSelected={this.onSelected.bind(this)}
            onClosed={this.onClosed.bind(this)}
            onBackButtonPressed={this.onBackButtonPressed.bind(this)}
            items={data}
            sortingLanguage={'tr'}
            showToTopButton={true}
            selected={selectedItem}
            showAlphabeticalIndex={true}
            autoGenerateAlphabeticalIndex={true}
            selectPlaceholderText={'Choose one...'}
            onEndReached={() => console.log('list ended...')}
            searchPlaceholderText={'Search...'}
            requireSelection={false}
            autoSort={false}
          />
          <View style={{ padding: 10, alignItems: 'center', backgroundColor: '#ddd' }}>
            <Text>Chosen: </Text>
            <Text>{JSON.stringify(selectedItem)}</Text>
          </View>
        </SafeAreaView>
        )
    }
}