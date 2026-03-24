import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, Filter, Clock, Calendar, RefreshCcw, Info } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { RouteDelay } from '@shared/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
export function DelaysPage() {
  const [search, setSearch] = useState('');
  const { data: delays = [], isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['delays'],
    queryFn: () => api<RouteDelay[]>('/api/delays'),
    refetchInterval: 30000, 
  });
  const filteredDelays = delays.filter(d =>
    d.routeNumber.toLowerCase().includes(search.toLowerCase()) ||
    d.school.toLowerCase().includes(search.toLowerCase())
  );
  const activeIssues = delays.filter(d => d.status !== 'On Time').length;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 animate-in fade-in slide-in-from-bottom-4">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase italic mb-4">
            Delays & <span className="text-primary">Cancellations</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Real-time information on service disruptions. Updates are posted as soon as they are received from operators.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors disabled:opacity-50"
        >
          <RefreshCcw className={cn("w-4 h-4", isRefetching && "animate-spin")} />
          {isRefetching ? 'Updating...' : 'Refresh Status'}
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search by route or school..."
            className="pl-10 h-12 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-primary rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 whitespace-nowrap">
            <Info className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold">
              {activeIssues} active issues / {delays.length} routes
            </span>
          </div>
          <div className="flex gap-2">
            <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <button className="bg-slate-900 dark:bg-primary dark:text-slate-900 text-white p-2 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity shrink-0 w-10 h-10">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:block overflow-hidden rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm relative">
        <div className="overflow-auto max-h-[70vh]">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-800/80 sticky top-0 z-10 backdrop-blur-md">
              <TableRow className="hover:bg-transparent border-b-2 border-slate-200 dark:border-slate-700">
                <TableHead className="w-[150px] font-black uppercase tracking-wider py-6">Route</TableHead>
                <TableHead className="font-black uppercase tracking-wider py-6">School</TableHead>
                <TableHead className="font-black uppercase tracking-wider py-6">Status</TableHead>
                <TableHead className="font-black uppercase tracking-wider py-6">Delay</TableHead>
                <TableHead className="text-right font-black uppercase tracking-wider py-6">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={5} className="py-6"><Skeleton className="h-8 w-full" /></TableCell>
                  </TableRow>
                ))
              ) : filteredDelays.length > 0 ? (
                filteredDelays.map((delay) => (
                  <TableRow key={delay.id} className="group hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors border-slate-100 dark:border-slate-800">
                    <TableCell className="font-black text-lg py-6 group-hover:text-primary transition-colors">{delay.routeNumber}</TableCell>
                    <TableCell className="font-bold py-6 text-slate-700 dark:text-slate-300">{delay.school}</TableCell>
                    <TableCell className="py-6">
                      <Badge className={cn(
                        "uppercase font-black tracking-widest text-[10px] px-3 py-1",
                        delay.status === 'Cancelled' ? "bg-destructive text-white" :
                        delay.status === 'Delayed' ? "bg-primary text-slate-900" :
                        "bg-emerald-500 text-white"
                      )}>
                        {delay.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-6">
                      {delay.delayMinutes ? (
                        <div className="flex items-center gap-2 font-bold text-slate-600 dark:text-slate-400">
                          <Clock className="w-4 h-4 text-primary" />
                          {delay.delayMinutes} mins
                        </div>
                      ) : "-"}
                    </TableCell>
                    <TableCell className="text-right py-6 font-medium text-slate-400">
                      {delay.lastUpdated}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-20 text-center text-muted-foreground italic">
                    No matching route delays found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="grid md:hidden grid-cols-1 gap-6">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))
        ) : filteredDelays.map((delay) => (
          <div key={delay.id} className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4 hover:border-primary transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Route</span>
                <h3 className="text-2xl font-black">{delay.routeNumber}</h3>
              </div>
              <Badge className={cn(
                "uppercase font-black tracking-widest text-[10px] px-3 py-1",
                delay.status === 'Cancelled' ? "bg-destructive text-white" :
                delay.status === 'Delayed' ? "bg-primary text-slate-900" :
                "bg-emerald-500 text-white"
              )}>
                {delay.status}
              </Badge>
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">School</span>
              <p className="font-bold text-slate-700 dark:text-slate-300">{delay.school}</p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                <Clock className="w-4 h-4" />
                <span>{delay.delayMinutes ? `${delay.delayMinutes} min delay` : "On schedule"}</span>
              </div>
              <span className="text-xs font-medium text-slate-400">{delay.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}