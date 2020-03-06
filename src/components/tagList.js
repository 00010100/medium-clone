import React from 'react'

export const TagList = ({tags}) => {
  return (
    <ul className="tag-list">
      {tags.map(tag => (
        <li className="tag-default tag-pill tag-outline" key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  )
}
