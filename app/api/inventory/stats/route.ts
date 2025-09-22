// app/api/inventory/stats/route.ts
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const mockStats = {
//     totalAssets: 120,
//     availableAssets: 50,
//     inUseAssets: 60,
//     maintenanceAssets: 10,
//     windowsMachines: 80,
//     linuxMachines: 40,
//     overdueReturns: 5,
//     pendingReturns: 8,
//   };

//   return NextResponse.json(mockStats);
// }

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const totalAssets = await prisma.asset.count();
  const availableAssets = await prisma.asset.count({
    where: { status: "available" },
  });
  const inUseAssets = await prisma.asset.count({
    where: { status: "in_use" },
  });
  const maintenanceAssets = await prisma.asset.count({
    where: { status: "maintenance" },
  });

  const windowsMachines = await prisma.asset.count({
    where: { platform: "windows" },
  });
  const linuxMachines = await prisma.asset.count({
    where: { platform: "linux" },
  });

  const overdueReturns = await prisma.asset.count({
    where: {
      expectedReturn: {
        lt: new Date(),
      },
      returnedAt: null,
    },
  });

  const pendingReturns = await prisma.asset.count({
    where: {
      returnedAt: null,
    },
  });

  return NextResponse.json({
    totalAssets,
    availableAssets,
    inUseAssets,
    maintenanceAssets,
    windowsMachines,
    linuxMachines,
    overdueReturns,
    pendingReturns,
  });
}

