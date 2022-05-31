import React from 'react';

import Card from '../../components/Card';

export default function ReplyItem(props) {
  return (
      <Card>
          <div onClick={props.onClick}>
              <p>{props.replyData.description}</p>
          </div>
      </Card>
  )
}
