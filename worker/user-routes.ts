import { Hono } from "hono";
import type { Env } from './core-utils';
import { AlertEntity, DelayEntity, NewsEntity, FAQEntity, ContactEntity } from "./entities";
import { ok, bad } from './core-utils';

let routesInjected = false;

export function userRoutes(app: Hono<{ Bindings: Env }>) {
  if (routesInjected) return;
  routesInjected = true;

  // ALERTS - Sort by severity priority and date
  app.get('/api/alerts', async (c) => {
    try {
      await AlertEntity.ensureSeed(c.env);
      const page = await AlertEntity.list(c.env, null, 100);
      const sorted = [...page.items].sort((a, b) => {
        // Critical first
        const priority = { critical: 0, warning: 1, info: 2 };
        if (priority[a.severity] !== priority[b.severity]) {
          return priority[a.severity] - priority[b.severity];
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return ok(c, sorted);
    } catch (e) {
      return bad(c, e instanceof Error ? e.message : 'Failed to fetch alerts');
    }
  });
  // DELAYS - Large list for searchability
  app.get('/api/delays', async (c) => {
    try {
      await DelayEntity.ensureSeed(c.env);
      const page = await DelayEntity.list(c.env, null, 1000);
      // Sort issues first, then route number
      const sorted = [...page.items].sort((a, b) => {
        if (a.status !== b.status) {
          if (a.status === 'Cancelled') return -1;
          if (b.status === 'Cancelled') return 1;
          if (a.status === 'Delayed') return -1;
          if (b.status === 'Delayed') return 1;
        }
        return a.routeNumber.localeCompare(b.routeNumber);
      });
      return ok(c, sorted);
    } catch (e) {
      return bad(c, e instanceof Error ? e.message : 'Failed to fetch delays');
    }
  });
  // NEWS - Sort by date descending
  app.get('/api/news', async (c) => {
    try {
      await NewsEntity.ensureSeed(c.env);
      const page = await NewsEntity.list(c.env, null, 100);
      const sorted = [...page.items].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return ok(c, sorted);
    } catch (e) {
      return bad(c, e instanceof Error ? e.message : 'Failed to fetch news');
    }
  });
  // FAQS
  app.get('/api/faqs', async (c) => {
    try {
      await FAQEntity.ensureSeed(c.env);
      const page = await FAQEntity.list(c.env, null, 100);
      return ok(c, page.items);
    } catch (e) {
      return bad(c, e instanceof Error ? e.message : 'Failed to fetch faqs');
    }
  });
  // CONTACTS
  app.get('/api/contacts', async (c) => {
    try {
      await ContactEntity.ensureSeed(c.env);
      const page = await ContactEntity.list(c.env, null, 50);
      return ok(c, page.items);
    } catch (e) {
      return bad(c, e instanceof Error ? e.message : 'Failed to fetch contacts');
    }
  });
  // MOCK FORM SUBMISSION
  app.post('/api/contact-inquiry', async (c) => {
    return ok(c, { message: 'Inquiry received successfully' });
  });
}