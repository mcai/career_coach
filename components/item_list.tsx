import React, { Component } from 'react';

interface ItemListProps {
    items: string[];
    onChange: (list: string[]) => void;
}

interface ItemListState {
    newItem: string;
}

export class ItemList extends Component<ItemListProps, ItemListState> {
    constructor(props: ItemListProps) {
        super(props);

        this.state = {
            newItem: ''
        };
    }

    handleAddItem(item: string) {
        const newList = [...this.props.items, item];
        this.props.onChange(newList);

        this.setState({
            newItem: ''
        });
    };

    handleRemoveItem(index: number) {
        const newList = [...this.props.items];
        newList.splice(index, 1);
        this.props.onChange(newList);
    };

    handleUpdateItem(index: number, item: string) {
        const newList = [...this.props.items];
        newList[index] = item;
        this.props.onChange(newList);
    };

    render() {
        return <>
            <div className="item-list">
                {this.props.items.map((item, index) => (
                    <div key={index} className="item-list-item">
                        <input
                            className="item-list-input"
                            value={item}
                            onChange={e => this.handleUpdateItem(index, e.target.value)}
                        />
                        <div className="ml-2">
                            <button
                                className="item-list-remove-button"
                                onClick={() => this.handleRemoveItem(index)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                <button className="item-list-add-button" onClick={() => this.handleAddItem("")}>
                    Add
                </button>
            </div>
        </>;
    }
}