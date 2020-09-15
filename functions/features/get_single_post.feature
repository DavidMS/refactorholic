Feature: Get a single post
  Getting a single post from the server

  Scenario: Return null if post does not exist
    Given there is a post with slug 'slug-1'
    When the user queries:
    """
    {
      post(slug:"slug-2") {
        slug
      }
    }
    """
    Then a null 'post' is returned
