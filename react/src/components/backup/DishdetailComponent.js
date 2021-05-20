import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    convertTime(date) {
        var d = date.substr(0, 10);
        d = d.split("-");
        var year = d[0]; var month=d[1]; var day = d[2];
        if(month==="01") month="Jan";
        else if(month==="02") month="Feb";
        else if(month==="03") month="Mar";
        else if(month==="04") month="Apr";
        else if(month==="05") month="May";
        else if(month==="06") month="Jun";
        else if(month==="07") month="Jul";
        else if(month==="08") month="Aug";
        else if(month==="09") month="Sep";
        else if(month==="10") month="Oct";
        else if(month==="11") month="Nov";
        else if(month==="12") month="Dec";

        return month + " " + day + ", " + year;
    }

    renderComment() {
        const comments = this.props.dish.comments.map((comment) => {
            return (
              <div>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {this.convertTime(comment.date)}</p>
              </div>
            );
        });
        return (comments);
    }

    render() {
        if (this.props.dish != null) {
            return(
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                                <CardTitle>{this.props.dish.name}</CardTitle>
                                <CardText>{this.props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        <h3>Comments</h3>
                        {this.renderComment()}
                    </div>
                </div>
            );
        } else {
          return(
              <div></div>
          );
        }
    }
}

export default DishDetail;