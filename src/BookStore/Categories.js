import React from 'react'
import { Picker } from 'react-native'

export default function (props) {
    const categories = [
        'all',
        'Science',
        'fiction',
        'Satire',
        'Drama',
        'Action and Adventure',
        'Romance',
        'Mystery',
        'Horror',
        'Self help',
        'Health',
        'Guide',
        'Travel',
        'Children',
        'Religion',
        'Spirituality & New Age',
        'Science',
        'History',
        'Math',
        'Anthology',
        'Poetry',
        'Encyclopedias',
        'Dictionaries',
        'Comics',
        'Art',
        'Cookbooks',
        'Diaries',
        'Journals',
        'Prayer books',
        'Series',
        'Trilogy',
        'Biographies',
        'Autobiographies',
        'Fantasy'
    ]

    return (
        <Picker
            selectedValue={props.selectedValue}
            mode="dialog"
            prompt="Choose Category"
            onValueChange={(itemValue) => props.changeCategory(itemValue)}>
            {
                categories.map((item, index) => {
                    return <Picker.Item label={item} value={item.toLowerCase()} key={index} />
                })
            }
        </Picker>
    )
}