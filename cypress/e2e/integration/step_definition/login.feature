@run_all @login
Feature: login

@login_success
Scenario Outline: Succeful
  Given the user is on home page
  When the user clicks the login button
  Then the user is on the login page
  When the user enters "<username>" and "<password>"
  And the user clicks submit
  Then the user should see the navigation bar
  And the user selects settings tab
  # And the user logs out


Examples:
  | username      | password |
  | a.b@gmail.com | a        |
