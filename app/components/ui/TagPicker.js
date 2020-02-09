import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import BigTag from '../ui/BigTag';
import Heading from '../heading';
import { useSelector } from 'react-redux';
import { getAppTheme } from '../../redux/reducers';
import Tag from './Tag';

const TagPicker = ({ small, label, labelIcon, tags, onSelect, multiple, selectedItems }) => {
    const theme = useSelector(state => getAppTheme(state));
    const [ selectItems, setSelectItems ] = useState(selectedItems);

    const handleOnSelect = (id, isSelected) => {
        let selected = [];

        if (multiple) {
            if (isSelected) {
                selected = [...selectItems, id];
            } else {
                selected = selectItems.filter((i) => i !== id);
            }
        } else {
            selected = isSelected ? [id] : [];
        }

        setSelectItems(selected);
        onSelect(selected);
    };

    return (
        <View>
            {
                label && <Heading text={label} styles={{ paddingLeft: 0 }} color={theme.primaryColor} icon={labelIcon} />
            }
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    tags.map((tag, index) => {
                        if (small) {
                            return <Tag
                                key={index}
                                isSelected={selectItems.includes(tag.id)}
                                id={tag.id}
                                label={tag.title}
                                disabled={tag.disabled}
                                onSelect={handleOnSelect}
                            />
                        }

                        return (
                            <BigTag
                                isSelected={selectItems.includes(tag.id)}
                                key={index}
                                id={tag.id}
                                title={tag.title}
                                description={tag.description}
                                disabled={tag.disabled}
                                onSelect={handleOnSelect}
                            />
                        )
                    })
                }
            </ScrollView>
        </View>
    )
};

TagPicker.defaultProps = {
    multiple: false,
    onSelect: () => {},
    tags: [],
    small: false,
    selectedItems: []
};

export default TagPicker;
