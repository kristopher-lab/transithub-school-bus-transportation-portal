import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Clock, ShieldCheck, MapPinned, ChevronRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_ALERTS, MOCK_NEWS } from '@shared/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
export function HomePage() {
  const criticalAlerts = MOCK_ALERTS.filter(a => a.severity === 'critical');
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative bg-secondary overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight uppercase italic mb-6">
              Your Daily Journey, <span className="text-primary">Perfected.</span>
            </h1>
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
        {/* Critical Alerts */}
        {criticalAlerts.length > 0 && (
          <div className="mb-16">
            {criticalAlerts.map(alert => (
              <div key={alert.id} className="bg-destructive/10 border-2 border-destructive rounded-2xl p-6 flex items-start gap-4 animate-bounce-short">
                <AlertTriangle className="w-8 h-8 text-destructive shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-black uppercase text-destructive mb-1">Critical Notice</h3>
                  <p className="text-foreground font-semibold">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="border-2 border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group">
            <CardHeader>
              <div className="bg-slate-100 dark:bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <Clock className="w-8 h-8 text-secondary dark:text-white" />
              </div>
              <CardTitle className="text-2xl font-black uppercase italic">Delays & Cancellations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">View live status updates for all bus routes and regional zones.</p>
              <Button asChild variant="link" className="p-0 text-secondary dark:text-primary font-bold uppercase tracking-widest text-xs">
                <Link to="/delays">View Live Map <ChevronRight className="ml-1 w-4 h-4" /></Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-2 border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group">
            <CardHeader>
              <div className="bg-slate-100 dark:bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <ShieldCheck className="w-8 h-8 text-secondary dark:text-white" />
              </div>
              <CardTitle className="text-2xl font-black uppercase italic">Parent Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Access your student's specific transportation details and eligibility.</p>
              <Button asChild variant="link" className="p-0 text-secondary dark:text-primary font-bold uppercase tracking-widest text-xs">
                <Link to="/parents">Member Access <ChevronRight className="ml-1 w-4 h-4" /></Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-2 border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group">
            <CardHeader>
              <div className="bg-slate-100 dark:bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <MapPinned className="w-8 h-8 text-secondary dark:text-white" />
              </div>
              <CardTitle className="text-2xl font-black uppercase italic">Eligibility Search</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Enter your address to find available schools and bus eligibility zones.</p>
              <Button asChild variant="link" className="p-0 text-secondary dark:text-primary font-bold uppercase tracking-widest text-xs">
                <Link to="/parents">Check Eligibility <ChevronRight className="ml-1 w-4 h-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        {/* News Section */}
        <section>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase italic">Recent <span className="text-primary">News</span></h2>
              <p className="text-muted-foreground">Stay informed with the latest transportation updates.</p>
            </div>
            <Button variant="outline" className="hidden sm:flex font-bold uppercase tracking-widest text-xs">View All News</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_NEWS.map(item => (
              <div key={item.id} className="group cursor-pointer">
                <div className="bg-slate-100 dark:bg-slate-900 aspect-[16/9] rounded-2xl mb-6 overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-primary text-slate-900 font-black uppercase tracking-widest text-[10px]">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                    <Bus className="w-12 h-12 text-slate-400 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.summary}</p>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">{new Date(item.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}