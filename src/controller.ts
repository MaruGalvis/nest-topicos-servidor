import { Controller, Get, UseGuards } from '@nestjs/common';
import { FeatureEnabled, FeatureFlagGuard } from 'feature-flags-npm';

@Controller('example')
export class ExampleController {
  @Get('enabled')
  @FeatureEnabled('testFeature')
  @UseGuards(FeatureFlagGuard)
  getEnabledFeature() {
    return { message: 'Flag activado funciona' };
  }

  @Get('disabled')
  @FeatureEnabled('disabledFeature')
  @UseGuards(FeatureFlagGuard)
  getDisabledFeature() {
    return { message: 'Flag desactivado funciona' };
  }
}
