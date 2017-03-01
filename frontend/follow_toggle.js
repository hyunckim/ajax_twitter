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
  }

  toggleState(){
    this.followState = (this.followState === "followed" ? "unfollowed" : "followed");
  }

  handleClick() {
    this.$el.on("click", e => {
    e.preventDefault();
    if (this.followState === "unfollowed"){
      $.ajax({
        method: "POST",
        url: `/users/${this.userId}/follow`,
        dataType: "json",
        success: (res) => {
          this.toggleState();
          this.render();
        }
      });
    } else {
      $.ajax({
        method: "DELETE",
        url: `/users/${this.userId}/follow`,
        dataType: "json",
        success: (res) => {
          this.toggleState();
          this.render();
          }
        });
      }
    });
  }
}
module.exports = FollowToggle;
