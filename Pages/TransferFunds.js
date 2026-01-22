import { test, expect } from '@playwright/test';
import cluster from 'node:cluster'; cluster.on('exit', (worker, code, signal) => { console.log(`Worker ${worker.process.pid} died`); });

exports.TransferFunds=class TransferFunds{
    constructor(page)
    {
        this.page=page;
        this.EnterMoney=page.getByPlaceholder('How much would you like to');
        this.ReviewButton=page.getByRole('button', { name: 'Review' });
        this.Review_Text=page.getByText('Review Your Transfer');
        this.ConfirmTransfer_Button=page.getByText('Confirm Transfer →');
        this.CloseButton=page.getByLabel('Close')
    }
    async transfermoney(){
        await this.EnterMoney.fill('85555');
        await this.ReviewButton.click();
        await expect(this.Review_Text).toBeVisible();
        await expect(this.ConfirmTransfer_Button).toBeVisible();
        await this.ConfirmTransfer_Button.click();
        await this.CloseButton.click();
        


    }
}