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
            <div className="flex flex-wrap">
                {this.props.items.map((item, index) => (
                <div key={index} className="w-full">
                    <input
                        className="custom-form-input"
                        value={item}
                        onChange={event => this.handleUpdateItem(index, event.target.value)}
                    />
                    <button
                        className="custom-form-button custom-form-button-secondary"
                        onClick={() => this.handleRemoveItem(index)}
                    >
                        Remove
                    </button>
                </div>
                ))}
            </div>
            <div className="flex w-full">
                <input
                    className="custom-form-input"
                    id="newItem"
                    name="newItem"
                    type="text"
                    value={this.state.newItem}
                    onChange={event => this.setState({ newItem: event.target.value })}
                />
                <button
                    className="custom-form-button custom-form-button-primary"
                    onClick={() => this.handleAddItem(this.state.newItem)}
                >
                    Add
                </button>
          </div>
        </>;
    }
}