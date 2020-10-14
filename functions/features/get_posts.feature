Feature: Get a list of posts
  Getting a list of posts from the server

  Scenario: Return empty array if there are no posts
    When the user queries 'posts { slug }'
    Then an empty array of 'posts' is returned

  Scenario: Return empty array if no post has publish date
    Given the post '{ "slug": "the-slug" }'
    When the user queries 'posts { slug }'
    Then an empty array of 'posts' is returned

  Scenario: Return an array of posts ordered by the publish date in descending order
    Given the post '{ "slug": "the-slug", "publishDate": 1000 }'
    And the post '{ "slug": "another-slug", "publishDate": 2000 }'
    When the user queries 'posts { slug }'
    Then the following 'posts' are returned
      | slug         |
      | another-slug |
      | the-slug     |
