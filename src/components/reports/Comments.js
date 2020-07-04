import React from 'react';
import { dateFromData } from '../../services/dateFromData';

const Comments = (props) => {
  return (
    <div className='commentReport'>
      <label>Comments</label>
        <div className='returned-comments'>
          {
            props.returnedComments &&
            props.returnedComments.map((data, i) => {
              const date = dateFromData(data);
              return (
                <div key={i}>
                  <p className='comment-description'>{data.description}</p>
                  <p className='comment-author'>{data.user.first_name + ' ' + data.user.last_name}</p>
                  <p className='time smaller-letter'>Commented on {date.days[date.day]}, 
                    {" " + date.date} - 
                    {date.months[date.month]} - 
                    {date.year + " "} at
                    {" " + date.hours}: 
                    {date.minutes + " "} 
                    hours
                  </p>
                  <hr />
                </div>
              )
            })
          }
        </div>
      <form onSubmit={props.handleSubmit}>
        <textarea
          placeholder='Add your comments here'
          name='comment'
          cols="30" 
          rows="10" 
          className="textarea" 
          onChange={props.handleChange}
          value={props.comment}>
        </textarea>
        <button type='submit' className="btn btn-primary">Add Comment</button>
      </form>
    </div>
  );
}

export default Comments;
