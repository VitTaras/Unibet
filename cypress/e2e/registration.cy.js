describe('Registration page', () => {
    beforeEach(() => {
      
      cy.visit('https://pl.unibet-67.com/registration')
    })


    it(' Main page check', () => {
        // Page title is equal to “Join the club”
        cy.get('[data-test-name="header-title"]').then(title => {
          expect(title).to.contain('Dołącz do klubu')
        })
        // At least one promotion is available
        cy.get('[data-dn="bonus-offer"]').should('exist')
        // 1st promotion is selected by default
        cy.get('[data-dn="bonus-offer"]').first().should("contain", "Wybrane")
        // “I want this Offer” button is available and in correct colour
        cy.get('[data-test-name="submit-button"]').should("have.css", "background-color", "rgb(255, 231, 31)")

    
    })

    it('1st Registration page check', () => {
        cy.get('[data-test-name="skip-welcome-bonus-offer-link"]').click()
      // Registration form is visible
      cy.get('form').should('exist')
      // Step 1 is marked in Green (progress visualisation)
      cy.get('[data-test-name="progress-bar-bubble"]').first().should("have.css", "background-color", "rgb(0, 83, 29)")
      // All fields and drop-down selections are visible
      cy.get('[data-test-name="firstName-input-field"]').should('not.to.be.disabled')
      cy.get('[data-test-name="lastName-input-field"]').should('not.to.be.disabled')
      cy.get('[data-test-name="email-input-field"]').should('not.to.be.disabled')
      cy.get('[data-test-name="password-input-field"]').should('not.to.be.disabled')
      cy.get('[data-test-name="dropdown-dateVal"]').should('not.to.be.disabled')
      cy.get('[data-test-name="dropdown-monthVal"]').should('not.to.be.disabled')
      cy.get('[data-test-name="dropdown-yearVal"]').should('not.to.be.disabled')
      cy.get('[data-test-name="gender-drop-down"]').should('not.to.be.disabled')
      // Continue Button is greyed out and not clickable while fields are not filled
      cy.get('[data-test-name="submit-button"]').should('to.be.disabled')


  })

  it('Email validation', () => {
    cy.get('[data-test-name="skip-welcome-bonus-offer-link"]').click()
    cy.get('[data-test-name="email-input-field"]').type('test')
    cy.get('[data-test-name="email-error-message"]').contains('Podany e-mail jest nieprawidłowy.')
    cy.get('[data-test-name="email-input-field"]').clear()
    cy.get('[data-test-name="email-input-field"]').type('test@test.com')
    cy.get('[data-test-name="email-error-message"]').should('not.exist')
  })

  it('2nd registration page check ', () => {
      cy.get('[data-test-name="skip-welcome-bonus-offer-link"]').click()
    // Fill all the fields with valid data and click Continue button
      cy.get('[data-test-name="firstName-input-field"]').type('Jan')
      cy.get('[data-test-name="lastName-input-field"]').type('Kowalski')
      cy.get('[data-test-name="email-input-field"]').type('test@test.com')
      cy.get('[data-test-name="password-input-field"]').type('Arsenal17')
      cy.get('select[data-test-name="dropdown-dateVal"]').select('10')
      cy.get('select[data-test-name="dropdown-monthVal"]').select('listopad')
      cy.get('select[data-test-name="dropdown-yearVal"]').select('1988')
      cy.get('select[data-test-name="gender-drop-down"]').select('Mężczyzna')
      cy.get('[data-test-name="submit-button"]').click()
    
      // Registration form is visible
      cy.get('form').should('be.visible')
      // Step 1 is ticked and Step 2 is marked in Green (progress visualisation)
      cy.get('[data-test-name="progress-bar-bubble-success"]').should('exist')
      cy.get('[data-test-name="progress-bar-bubble"]').last().should("have.css", "background-color", "rgb(0, 83, 29)")
      // Join Button is greyed out and not clickable while fields are not filled
      cy.get('[data-test-name="submit-button"]').should('to.be.disabled')
    })
 

})