import React from 'react'
import "./index.css"
export default function PageTitle({title,sutitle}) {
    return (
        <div className="page-header mt-5">
            <span className="page-subtitle">{sutitle}</span>
            <h4 className="mb-2">{title}</h4>
        </div>
    )
}
