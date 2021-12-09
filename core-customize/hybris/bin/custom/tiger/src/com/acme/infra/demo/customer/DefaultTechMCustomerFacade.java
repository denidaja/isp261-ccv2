package com.acme.infra.demo.customer;

import de.hybris.platform.commercefacades.customer.impl.DefaultCustomerFacade;
import de.hybris.platform.commercefacades.user.data.CustomerData;
import de.hybris.platform.commerceservices.customer.DuplicateUidException;
import de.hybris.platform.commerceservices.event.UpdatedProfileEvent;
import de.hybris.platform.core.model.user.CustomerModel;

public class DefaultTechMCustomerFacade extends DefaultCustomerFacade
{

    @Override
    public CustomerData getCurrentCustomer()
    {
        return super.getCurrentCustomer();
    }

    @Override
    public void updateFullProfile(final CustomerData customerData) throws DuplicateUidException
    {
        validateDataBeforeUpdate(customerData);

        final CustomerModel customer = getCurrentSessionCustomer();
        getCustomerReversePopulator().populate(customerData, customer);

        if (customer.getDefaultPaymentAddress() != null)
        {
            getModelService().save(customer.getDefaultPaymentAddress());
        }

        if (customer.getDefaultShipmentAddress() != null)
        {
            getModelService().save(customer.getDefaultShipmentAddress());
        }

        getModelService().save(customer);
        getEventService().publishEvent(initializeCommerceEvent(new UpdatedProfileEvent(), customer));
    }
}
