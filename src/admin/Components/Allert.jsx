import React from 'react'

export default function Allert({ message }) {
    return (
        <>
            <h3 className="flex flex-row py-2 text-secondary-text px-4">
                <strong>Allert :</strong> <span>&nbsp;{". . ."}&nbsp;{message}</span>
            </h3>
        </>
    )
}
