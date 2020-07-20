import React from 'react';
import { Button } from 'react-bootstrap';

const Votes = (props) => {
  const id = props.id;
  const a = "https://www.facebook.com/sharer/sharer.php?u=";
  const b = "https%3A%2F%2Fvoiceout.netlify.app%2Freport%2F";
  const c = id + "&amp;src=sdkpreparse";
  const fbUrl = a + b + c;
  const data = JSON.parse(localStorage.getItem('response'));
	const localStorageUser = data && data.user ? data.user : '';
  return (
    <div className='votes'>
      {
        props.stateUpvote ? 
        <i
          onClick={props.upvoteFunction}
          style={{color: '#4287f5'}} 
          className='material-icons'>
            thumb_up
        </i> :
        <i
          onClick={
            localStorageUser ?
            props.upvoteFunction :
            ''
          }
          className='material-icons'>
            thumb_up
        </i>
      }
      <span> {props.stateUpvotes} </span>
      {
        props.stateDownvote ? 
        <i
          onClick={props.downvoteFunction}
          style={{color: '#4287f5'}} 
          className='material-icons'>
            thumb_down
        </i> :
        <i
          onClick={
            localStorageUser ?
            props.downvoteFunction :
            ''
          }
          className='material-icons'>
            thumb_down
        </i>
      }
      <span> {props.stateDownvotes} </span>
      {
        localStorageUser && localStorageUser.id === props.oneReport.user.id ?
        <Button onClick={props.handleShowSharePage}>Share to Voices</Button> :
        ''
      }
      {" "}
      {
        localStorageUser && localStorageUser.id === props.oneReport.user.id ?
        <div 
          class="fb-share-button" 
          data-href={"https://voiceout.netlify.app/report/" + id }
          data-layout="button_count" 
          data-size="large">
            <a 
              target="_blank" 
              href={fbUrl} 
              class="fb-xfbml-parse-ignore">
                Share
          </a>
        </div> :
        ''
      }
    </div>
  );
}

export default Votes;
