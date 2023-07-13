/// <reference types='Cypress' />

describe('Patientor e2e', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('Ensure webpage connection', () => {
    cy.contains('Dana Scully');
  });

  it('Webpage navigation', () => {
    cy.contains('Dana Scully').click();
    cy.contains('occupation: Forensic Pathologist');
    cy.contains('Yearly control visit.');
    cy.contains('Home').click();
    cy.contains('Hans Gruber').click();
    cy.contains('Technician');
  });

  describe('New patient', () => {
    it('Check new patient form', () => {
      cy.contains('Add New Patient').click();
      cy.contains('Add a new patient');
      cy.get('.NameInput').type('Hyo Hyo');
      cy.get('.SSNInput').type('123456-123X');
      cy.get('.DOBInput').type('1998-06-14');
      cy.get('.OccuInput').type('Engineer');
      cy.get('.GenderSelect').click().get('.male').click();
      cy.get('.SubmitNewPatient').click();
    });

    it('Check new patient info', () => {
      cy.contains('Hyo Hyo').click();
      cy.contains('123456-123X');
      cy.contains('Engineer');
    });
  });

  describe('New entries', () => {
    beforeEach(() => {
      cy.contains('Matti Luukkainen').click();
      cy.contains('Add New Entry').click();
    });
    it('Add hospital entry', () => {
      cy.get('.TypeSelect').click().get('.Hospital').click();
      cy.get('.DateInput').type('2023-06-07');
      cy.get('.SpecInput').type('Dr Byte House');
      cy.get('.DescInput').type('Yearly Checkup');
      cy.get('.DiagSelect').click();
      cy.get('#diagnosis-13').click();
      cy.get('.DiagAdd').click();
      cy.get('.DischargeDate').type('2023-06-11');
      cy.get('.DischargeCriteria').type('none');
      cy.get('.AddNewEntry').click();
    });
    it('Add healthcheck entry', () => {
      cy.get('.TypeSelect').click().get('.HealthCheck').click();
      cy.get('.DateInput').type('2023-06-07');
      cy.get('.SpecInput').type('Dr Byte House');
      cy.get('.DescInput').type('Yearly Checkup');
      cy.get('.DiagSelect').click();
      cy.get('#diagnosis-13').click();
      cy.get('.DiagAdd').click();
      cy.get('.RatingSelect').click().get('#3').click();
      cy.get('.AddNewEntry').click();
    });
    it('Add Occupationalhealthcare entry', () => {
      cy.get('.TypeSelect').click().get('.OccupationalHealthcare').click();
      cy.get('.DateInput').type('2023-06-07');
      cy.get('.SpecInput').type('Dr Byte House');
      cy.get('.DescInput').type('Yearly Checkup');
      cy.get('.DiagSelect').click();
      cy.get('#diagnosis-13').click();
      cy.get('.DiagAdd').click();
      cy.get('.EmployerInput').type('Unspecified');
      cy.get('.StartDateInput').type('2023-06-11');
      cy.get('.EndDateInput').type('2023-06-13');
      cy.get('.AddNewEntry').click();
    });
  });
});


export {};