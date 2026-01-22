import { test, expect } from '@playwright/test';
import cluster from 'node:cluster'; cluster.on('exit', (worker, code, signal) => { console.log(`Worker ${worker.process.pid} died`); });
exports.HomePage = class HomePage {
    constructor(page) {
        this.page = page;
        this.heading = page.locator("xpath=//*[text()=' Welcome! ']")
        this.transferFunds = page.getByRole('link', { name: 'Transfer Funds →' })
        this.applyLoan = page.getByRole('link', { name: 'Apply For A Loan →' })
        this.LoanStatus = page.locator('xpath=//*[text()=" Loan Status "]');
        this.Product = page.getByRole('button', { name: 'Products' });
        this.Loans = page.getByRole('link', { name: 'Loans' });
        this.CreditCards = page.getByRole('link', { name: 'Credit Cards' });
        this.MobileBanking = page.getByRole('link', { name: 'Mobile Banking' });
        this.Profile=page.locator("xpath=//*[text()='Profile']");
        this.Usernmae=page.locator("xpath=//*[text()='Username']/following-sibling::h5");
        this.FirstName=page.locator("xpath=//*[text()='First Name']//following-sibling::h5");
        this.LastName=page.locator("xpath=//*[text()='Last Name']//following-sibling::h5");
        this.Email=page.locator("xpath=//*[text()='Email']//following-sibling::h5");
        this.UserID=page.locator("xpath=//*[text()=' User ID']//following-sibling::h5");
        this.DOB=page.locator("xpath=//*[text()='Age']//following-sibling::div");
        this.Logout=page.locator("xpath=//*[text()='Logout']");
        this.SignButton=page.locator("xpath=//*[text()='Sign In']");

    }
    async headingvisible(page) {
        //await expect (this.heading).toBeVisible();
        await expect(page.locator('app-accounts')).toContainText('Welcome!');
        await expect(page.getByRole('heading', { name: 'Welcome!' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Products' })).toBeVisible();

    }
    async optionsvisible() {
        await expect(this.transferFunds).toBeVisible();
        await expect(this.applyLoan).toBeVisible();
        await expect(this.LoanStatus).toBeVisible();
    }
    async clickTransfermoney() {
        await this.transferFunds.click();
    }
    async clickApplyLoan() {
        await this.applyLoan.click();
    }
    async clickLoanStatus(page) {
        
        await this.LoanStatus.click();

    }
    async ProductOptionVisible() {
        await this.Product.click();
        await expect(this.Loans).toBeVisible();
        await expect(this.CreditCards).toBeVisible();
        await expect(this.MobileBanking).toBeVisible();
    }
    async ProfileDetails(){
        await this.Profile.click();
        await expect(this.Usernmae).toBeVisible();
        await expect(this.FirstName).toBeVisible();
        await expect(this.LastName).toBeVisible();
        await expect(this.Email).toBeVisible();
        await expect(this.UserID).toBeVisible();
        await expect(this.DOB).toBeVisible();
    }
    async LogoutSuccessfully(){
        await this.Logout.click();
        await expect(this.SignButton).toBeVisible();


    }
}