@run_all @login
Feature: Login

@login_success
Scenario Outline: Succeful
  Given I am on the login page
  When I enter my valid credentials "<username>" and "<password>"
  And I click the login button
  Then I should see the navigation bar
  And I should be redirected to the profile page


Examples:
  | username      | password |
  | a.b@gmail.com | a        |
