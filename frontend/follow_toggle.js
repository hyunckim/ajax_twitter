const APIUtil = require('./api_util');

class FollowToggle {
  constructor($el) {
    this.userId = $el.data('user-id');
    this.followState = $el.data('initial-follow-state');
    this.$el = $el;
    this.render();
    this.handleClick();
  }


  render() {
    if (this.followState === "unfollowed") {
      this.$el.html("Follow!");
    } else {
      this.$el.html("Unfollow!");
    }
    this.$el.prop("disabled", false);
  }

  toggleState(){
    this.followState = (this.followState === "followed" ? "unfollowed" : "followed");
    this.render();
  }

  handleClick() {
    this.$el.on("click", (e) => {
      e.preventDefault();
      this.$el.prop("disabled", true);
      if (this.followState === "unfollowed"){
        APIUtil.followUser(this.userId).then(() => this.toggleState());
      } else {
        APIUtil.unfollowUser(this.userId).then(() => this.toggleState());
        }
    });
  }
}
module.exports = FollowToggle;
