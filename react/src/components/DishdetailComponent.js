import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({dish}) {
    return (
    <div  className="col-12 col-md-5 m-1">
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    </div>);
}


function RenderComments({dish}) {
    const comments = dish.comments.map((comment) => {
        return (
            <ul className="list-unstyled">
            <li>{comment.comment}</li>
            <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
            </ul>
        );
    });
    return (comments);
}

const DishDetail = (props) => {
    if (props.dish != null) {
        return(
            <div className="container" style={{textAlign: "left"}}>
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <div  className="col-12 col-md-5 m-1">
                        <h3>Comments</h3>
                        <RenderComments dish={props.dish}/>
                    </div>
                </div>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
}

export default DishDetail;

// class DishDetail extends Component {
//     constructor(props) {
//         super(props);
//     }

//     renderDish() {
//         return (
//         <div  className="col-12 col-md-5 m-1">
//             <Card>
//                 <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
//                 <CardBody>
//                     <CardTitle>{this.props.dish.name}</CardTitle>
//                     <CardText>{this.props.dish.description}</CardText>
//                 </CardBody>
//             </Card>
//         </div>);
//     }

//     convertTime(date) {
//         var d = date.substr(0, 10);
//         d = d.split("-");
//         var year = d[0]; var month=d[1]; var day = d[2];
//         if(month==="01") month="Jan";
//         else if(month==="02") month="Feb";
//         else if(month==="03") month="Mar";
//         else if(month==="04") month="Apr";
//         else if(month==="05") month="May";
//         else if(month==="06") month="Jun";
//         else if(month==="07") month="Jul";
//         else if(month==="08") month="Aug";
//         else if(month==="09") month="Sep";
//         else if(month==="10") month="Oct";
//         else if(month==="11") month="Nov";
//         else if(month==="12") month="Dec";

//         return month + " " + day + ", " + year;
//     }

//     renderComments() {
//         const comments = this.props.dish.comments.map((comment) => {
//             return (
//               <ul className="list-unstyled">
//                 <li>{comment.comment}</li>
//                 <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
//                 {/* <li>-- {comment.author}, {this.convertTime(comment.date)}</li> */}
//               </ul>
//             );
//         });
//         return (comments);
//     }

//     render() {
//         if (this.props.dish != null) {
//             return(
//                 <div className="container" style={{textAlign: "left"}}>
//                     <div className="row">
//                         {this.renderDish()}
//                         <div  className="col-12 col-md-5 m-1">
//                             <h3>Comments</h3>
//                             {this.renderComments()}
//                         </div>
//                     </div>
//                 </div>
//             );
//         } else {
//           return(
//               <div></div>
//           );
//         }
//     }
// }

// export default DishDetail;