import { LightningElement, api } from "lwc";

export default class ChildRating extends LightningElement {
  feedbackRating;

  rating(event) {
    if (event.target.name === "feedbackRating") {
      this.feedbackRating = event.target.value;
    }
  }

  getvalues() {
    alert(
      "feedbackRating:" +
        this.feedbackRating
    );
  }
}