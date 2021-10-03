Feature: Taxonomy Models


  Scenario: Using the datastoreFetcher for Cultivar's genus and species with the memoryDatastore
    Given a memoryDatastoreProvider is created
    And model instances are created using TaxonomyModelDataset1
    When the models are saved
    And getSpecies is called on cultivar at list index 0
    Then species at list index 0 is returned

  Scenario: Trying to save a Genus with a name that already exists results in a validation error.
    Given a memoryDatastoreProvider is created
    And model instances are created using TaxonomyModelDataset2
    When the models are saved
    And a singleInstance Genera is created using TestGenera1
    Then a singleInstance is validated resulting in an error

  Scenario: Trying to save a Genus with a latinName that already exists results in a validation error.
    Given a memoryDatastoreProvider is created
    And model instances are created using TaxonomyModelDataset2
    When the models are saved
    And a singleInstance Genera is created using TestGenera3
    Then a singleInstance is validated resulting in an error

  Scenario: Trying to save a Genus with a latinName and name that already exists results in a validation error.
    Given a memoryDatastoreProvider is created
    And model instances are created using TaxonomyModelDataset2
    When the models are saved
    And a singleInstance Genera is created using TestGenera2
    Then a singleInstance is validated resulting in an error
