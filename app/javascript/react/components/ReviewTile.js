import React, {useState} from "react";
import ReviewShowTile from "./ReviewShowTile"
import ReviewEditTile from "./ReviewEditTile"

const ReviewTile = (props) => {
  const [showEditTile, setShowEditTile] = useState(false);


  

  const onEditClickHandler = (event) =>{
     // call/load editReview (new form with slightly different styling)
     setShowEditTile(true);
  }

  const onDeleteClickHandler = (event) => {


  }

  const onDiscardClickHandler = (event) => {
    setShowEditTile(false);
  }

  const onSaveClickHandler = (event) => {

  }

  const editReview = (payload) =>{

  }

  let displayTile = null
  //check state

  if ( showEditTile){
    displayTile =(<ReviewEditTile 
      review={props.review}
      editReview= {editReview}
      onDiscardClickHandler = {onDiscardClickHandler}
      
      />)
      
    }else {
      
      displayTile = (<ReviewShowTile 
              review={props.review}
              handleVoteSubmit={props.handleVoteSubmit}
              voteErrors={props.voteErrors}
              onEditClickHandler = {onEditClickHandler}
              onDeleteClickHandler = {onDeleteClickHandler}
      />);

  }



  return (
    <div>
      <div> 

      </div>

     <div>
      {displayTile}
    </div> 
    </div>
   
  );
};

export default ReviewTile;
