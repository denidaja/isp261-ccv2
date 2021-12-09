/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package com.acme.infra.demo.populator;

import java.util.ArrayList;
import java.util.List;

import com.acme.infra.demo.model.LoyaltyModel;
import de.hybris.platform.commercefacades.storesession.data.CurrencyData;
import de.hybris.platform.commercefacades.storesession.data.LanguageData;
import de.hybris.platform.commercefacades.user.converters.populator.CustomerPopulator;
import de.hybris.platform.commercefacades.user.data.CustomerData;
import de.hybris.platform.commercefacades.user.data.LoyaltyData;
import de.hybris.platform.commerceservices.strategies.CustomerNameStrategy;
import de.hybris.platform.converters.Populator;
import de.hybris.platform.core.model.c2l.CurrencyModel;
import de.hybris.platform.core.model.c2l.LanguageModel;
import de.hybris.platform.core.model.user.CustomerModel;
import de.hybris.platform.core.model.user.TitleModel;
import de.hybris.platform.core.model.user.UserModel;
import de.hybris.platform.servicelayer.dto.converter.Converter;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.util.Assert;

/**
 * Converter implementation for {@link UserModel} as source and
 * {@link CustomerData} as target type.
 */
public class TechMCustomerPopulator extends CustomerPopulator
{
	@Override
	public void populate(final CustomerModel source, final CustomerData target)
	{
		super.populate(source,target);
		target.setLoyaltyPoint(source.getLoyaltyPoint());
		List<LoyaltyData> loyaltyDataList= new ArrayList<>();
		for (LoyaltyModel loyaltyModel : source.getLoyalty())
		{
			LoyaltyData loyaltyData= new LoyaltyData();
			loyaltyData.setLoyaltyPoint(loyaltyModel.getLoyalty());
			loyaltyData.setOrderNumber(loyaltyModel.getOrderNumber());
			loyaltyDataList.add(loyaltyData);
		}
		target.setLoyaltyHistory(loyaltyDataList);
	}

}
