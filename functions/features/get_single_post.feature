Feature: Get a single post
  Getting a single post from the server

  Scenario: Return null if post does not exist
    Given the post '{ "slug": "first-post" }'
    When the user queries 'post(slug:"second-post") { slug }'
    Then a null 'post' is returned

  Scenario: Return the post if it exists
    Given the post
    """
    {
      "slug": "first-post",
      "text": "Hello, this is the first post"
    }
    """
    When the user queries 'post(slug:"first-post") { text }'
    Then the following 'post' is returned: '{ "text": "Hello, this is the first post" }'
