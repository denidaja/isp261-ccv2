package com.acme.infra.demo.customer;

import java.util.List;

import com.acme.infra.demo.model.LoyaltyModel;
import de.hybris.platform.commercefacades.customer.impl.DefaultCustomerFacade;
import de.hybris.platform.commercefacades.user.data.CustomerData;
import de.hybris.platform.commerceservices.customer.DuplicateUidException;
import de.hybris.platform.commerceservices.event.UpdatedProfileEvent;
import de.hybris.platform.core.model.user.CustomerModel;
import org.apache.log4j.Logger;

public class DefaultTechMCustomerFacade extends DefaultCustomerFacade
{

    private static final Logger LOG = Logger.getLogger(DefaultTechMCustomerFacade.class);

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

        if(customerData.getLoyaltyPoint()!= null &&  customerData.getOrderNumber() !=null)
        {
            LoyaltyModel loyaltyModel= getModelService().create(LoyaltyModel.class);
            loyaltyModel.setCustomer(customer);
            loyaltyModel.setLoyalty(customerData.getLoyaltyPoint());
            loyaltyModel.setOrderNumber(customerData.getOrderNumber());
            getModelService().save(loyaltyModel);
            getModelService().refresh(customer);
            Integer totalLOyalty=0;
            for (LoyaltyModel loyaltyModel1: customer.getLoyalty())
            {
                totalLOyalty+= loyaltyModel1.getLoyalty()==null ? 0: loyaltyModel1.getLoyalty();
            }
            customer.setLoyaltyPoint(totalLOyalty);
        }
        else
        {
            LOG.error("Invalid Data- Loayalty :"+ customerData.getLoyaltyPoint() +", Order No: "+ customerData.getOrderNumber());
        }
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
