import { dateFromData } from '../../services/dateFromData';
import React, { Component } from 'react'

class Comments extends Component {
  render() {
    const data = JSON.parse(localStorage.getItem('response'));
    const localStorageUser = data && data.user ? data.user : '';
    return (
      <div className='commentReport'>
        <label>Comments</label>
        <div className='returned-comments'>
          {
            this.props.returnedComments &&
            this.props.returnedComments.map((data, i) => {
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
        {
          localStorageUser ?
            <form onSubmit={this.props.handleSubmit}>
              <textarea
                placeholder='Add your comments here'
                name='comment'
                cols="30" 
                rows="10" 
                className="textarea" 
                onChange={this.props.handleChange}
                value={this.props.comment}>
              </textarea>
              <button type='submit' className="btn btn-primary">Add Comment</button>
            </form> : 
            <div style={{color: '#f46'}}>
              <p>You can Upvote, Downvote and Comment on this Post when you Login</p>
            </div>
        }
      </div>
    )
  }
}

export default Comments;
