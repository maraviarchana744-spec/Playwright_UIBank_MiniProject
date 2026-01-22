import { test, expect } from '@playwright/test';
import cluster from 'node:cluster'; cluster.on('exit', (worker, code, signal) => { console.log(`Worker ${worker.process.pid} died`); });
exports.ApplyLoan=class ApplyLoan{
    constructor(page){
        this.page=page;
        this.applyButton=page.locator('xpath=//*[@id="applyButton"]');
        this.EnterMail=page.getByRole('textbox', { name: 'Enter email address' });
        this.EnterAmount= page.getByPlaceholder('Enter loan amount you are');
        this.Term=page.locator('//*[@id="term"]')
        this.SelectTerm=page.locator('#term').selectOption('5');
        this.EnterIncome=page.getByRole('spinbutton', { name: 'Current Yearly Income (Before' });
        this.EnterAge=page.getByRole('spinbutton', { name: 'Age' });
        this.SubmitButton=page.getByRole('button', { name: 'Submit Loan Application' });
        this.message=page.getByRole('heading', { name: 'Sorry, at this time you have' });
    

    }
    async applyingLoan(){
        await this.applyButton.click();
        await this.EnterMail.fill('maravirchana744@gmail.com');
        await this.EnterAmount.fill('500000')
        // await this.Term.click();
        // await this.SelectTerm.click();
        await this.EnterIncome.fill('400000');
        await this.EnterAge.fill('22');
        await this.SubmitButton.click();
        await expect(this.message).toBeVisible();

    }
}