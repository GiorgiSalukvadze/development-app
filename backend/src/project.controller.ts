import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('project')
  async getProject() {
    return this.projectService.loadProject();
  }

  @Post('admin/reset')
  async resetProject() {
    return this.projectService.resetProject();
  }

  @Patch('units/:unitId')
  async updateUnit(@Param('unitId') unitId: string, @Body() changes: any) {
    const updated = await this.projectService.updateUnit(unitId, changes ?? {});
    if (!updated) {
      throw new NotFoundException('Unit not found');
    }
    return updated;
  }

  @Patch('units/:unitId/status')
  async updateUnitStatus(
    @Param('unitId') unitId: string,
    @Body('status') status: 'sold' | 'available',
  ) {
    if (!['sold', 'available'].includes(status)) {
      throw new BadRequestException('Invalid status');
    }
    const updated = await this.projectService.updateUnitStatus(unitId, status);
    if (!updated) {
      throw new NotFoundException('Unit not found');
    }
    return updated;
  }

  @Patch('floors/:floorId/status')
  async updateFloorStatus(
    @Param('floorId') floorId: string,
    @Body('status') status: 'sold' | 'available',
  ) {
    if (!['sold', 'available'].includes(status)) {
      throw new BadRequestException('Invalid status');
    }
    const floor = await this.projectService.updateFloorStatusBulk(
      floorId,
      status,
    );
    if (!floor) {
      throw new NotFoundException('Floor not found');
    }
    return floor;
  }

  @Get('hotspots')
  async getHotspots() {
    return this.projectService.getHotspots();
  }

  @Post('hotspots')
  async saveHotspots(@Body() hotspots: any[]) {
    if (!Array.isArray(hotspots)) {
      throw new BadRequestException(
        'Invalid body, expected array of hotspots',
      );
    }
    return this.projectService.saveHotspots(hotspots);
  }
}


