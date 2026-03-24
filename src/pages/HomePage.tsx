import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Clock, ShieldCheck, MapPinned, ChevronRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Alert, NewsItem } from '@shared/types';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
export function HomePage() {
  const { data: alerts = [], isLoading: alertsLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => api<Alert[]>('/api/alerts'),
  });
  const { data: news = [], isLoading: newsLoading } = useQuery({
    queryKey: ['news'],
    queryFn: () => api<NewsItem[]>('/api/news'),
  });
  const criticalAlerts = alerts.filter(a => a.severity === 'critical');
  const displayNews = news.slice(0, 4);
  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative bg-secondary overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight uppercase italic mb-6"
            >
              Your Daily Journey, <span className="text-primary">Perfected.</span>
            </motion.h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Real-time route information, reliable safety standards, and dedicated support for every student in our region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary text-slate-900 hover:bg-primary/90 font-black uppercase italic px-8 h-14">
                <Link to="/delays">Check Bus Status <ChevronRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-black uppercase italic px-8 h-14">
                Find Your Route
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {!alertsLoading && criticalAlerts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-destructive mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Critical System Notices ({criticalAlerts.length})
            </h3>
            <ScrollArea className={cn("rounded-2xl border-2 border-destructive/20", criticalAlerts.length > 2 ? "h-64" : "h-auto")}>
              <div className="p-4 space-y-4">
                {criticalAlerts.map(alert => (
                  <div key={alert.id} className="bg-destructive/5 border-l-4 border-destructive rounded-r-xl p-5 flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-1" />
                    <div>
                      <p className="text-foreground font-bold leading-snug">{alert.message}</p>
                      <span className="text-[10px] font-black uppercase tracking-widest text-destructive/60 block mt-2">
                        Posted {new Date(alert.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { title: 'Delays & Cancellations', icon: Clock, desc: 'View live status updates for all bus routes and regional zones.', link: '/delays', linkText: 'View Live Map' },
            { title: 'Parent Portal', icon: ShieldCheck, desc: "Access your student's specific transportation details and eligibility.", link: '/parents', linkText: 'Member Access' },
            { title: 'Eligibility Search', icon: MapPinned, desc: 'Enter your address to find available schools and bus eligibility zones.', link: '/parents', linkText: 'Check Eligibility' }
          ].map((card, i) => (
            <Card key={i} className="border-2 border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group">
              <CardHeader>
                <div className="bg-slate-100 dark:bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <card.icon className="w-8 h-8 text-secondary dark:text-white" />
                </div>
                <CardTitle className="text-2xl font-black uppercase italic">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{card.desc}</p>
                <Button asChild variant="link" className="p-0 text-secondary dark:text-primary font-bold uppercase tracking-widest text-xs">
                  <Link to={card.link}>{card.linkText} <ChevronRight className="ml-1 w-4 h-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <section>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase italic">Recent <span className="text-primary">News</span></h2>
              <p className="text-muted-foreground">Stay informed with the latest transportation updates.</p>
            </div>
            <Button variant="outline" className="hidden sm:flex font-bold uppercase tracking-widest text-xs">View All News</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[16/9] rounded-2xl w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))
            ) : (
              displayNews.map((item, idx) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="bg-slate-100 dark:bg-slate-900 aspect-[4/3] rounded-2xl mb-6 overflow-hidden relative">
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-primary text-slate-900 font-black uppercase tracking-widest text-[9px] px-2">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                      <Bus className="w-12 h-12 text-slate-400 group-hover:scale-125 transition-transform duration-500" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{item.summary}</p>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{new Date(item.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}