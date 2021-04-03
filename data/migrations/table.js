exports.up = function (knex) {
    return knex.schema
      .createTable("projects", (tbl) => {
        tbl.increments();
        tbl.string("project_name", 300).notNullable();
        tbl.string("project_description", 500);
        tbl.boolean("project_completed").notNullable().defaultTo(false);
      })
      .createTable("tasks", (tbl) => {
        tbl.increments();
        tbl.string("task_description", 500).notNullable();
        tbl.string("task_notes", 500);
        tbl.boolean("task_completed").notNullable().defaultTo(false);
  
        tbl
          .integer("project_id")
          .unsigned()
          .notNullable()
          .references("projects.id")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
      .createTable("resources", (tbl) => {
        tbl.increments();
        tbl.string("resource_name").notNullable().unique();
        tbl.string("resource_description", 500);
      })
      .createTable("projects_resources", (tbl) => {
        tbl
          .integer("project_id")
          .unsigned()
          .notNullable()
          .references("projects.id")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
  
        tbl
          .integer("resource_id")
          .unsigned()
          .notNullable()
          .references("resources.id")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
  
        tbl.primary(["project_id", "resource_id"]);
      });
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists("projects_resources")
      .dropTableIfExists("resources")
      .dropTableIfExists("tasks")
      .dropTableIfExists("projects");
  };