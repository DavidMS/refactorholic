Feature: Render single post
  Rend a single post from the server

  Scenario: Return null if post does not exist
    Given the post '{ "slug": "first-post" }'
    When the user navigates to '/posts/second-post'
    Then the text 'Post not found' is rendered

  Scenario: Return post if it exists
    Given the post '{ "slug": "first-post", "text": "This is the first post" }'
    When the user navigates to '/posts/first-post'
    Then the text 'This is the first post' is rendered
