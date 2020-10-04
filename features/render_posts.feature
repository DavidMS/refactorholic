Feature: Render the latest posts
  Rend a list of posts ordered by the publish date

  Scenario: Return no post if post there are no posts
    When the user navigates to '/posts'
    Then the text 'No post was found' is rendered

  Scenario: Return no post if post there are no posts with publish date
    Given the post '{ "slug": "the-slug" }'
    When the user navigates to '/posts'
    Then the text 'No post was found' is rendered

  Scenario: Show the posts ordered by publish date in descending order
    Given the post '{ "slug": "the-slug", "title": "The first post", "publishDate": 1000 }'
    And the post '{ "slug": "another-slug", "title": "The second post", "publishDate": 2000 }'
    When the user navigates to '/posts'
    Then the following posts are rendered
      | title           |
      | The second post |
      | The first post  |
