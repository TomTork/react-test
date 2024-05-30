import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

interface Props {
    items: string[];
    heading: string;
    onClick: (index: number) => void;
}

function ListGroup({ items, heading, onClick }: Props) {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const getMessage = () => {
        return items.length == 3 ? <p>No item found</p> : null;
    }
    return (
        <Fragment>
            <h1>{heading}</h1>
            {getMessage()}
            <div
                className="btn-group"
                role="toolbar"
                aria-label="Basic outlined example"
            >
                {items.map((item, index) => (
                    <button type="button"
                        key={item}
                        onClick={() => {
                            setSelectedIndex(index);
                            onClick(index);
                        }}
                        className={selectedIndex == index ? 'btn btn-primary active' : 'btn btn-primary'}>
                        {item}
                    </button>
                ))}
            </div>
        </Fragment>
    );
}

export default ListGroup;
