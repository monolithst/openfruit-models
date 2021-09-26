Feature: Taxonomy Models


  Scenario: Using the datastoreFetcher for Cultivar's genus and species with the memoryDatastore
    Given a memoryDatastoreProvider is created
    And model instances are created using TaxonomyModelDataset1
    When the models are saved
    And getSpecies is called on cultivar at list index 0
    Then species at list index 0 is returned
