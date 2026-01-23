module.exports = {
  name: "interactionCreate",
  async execute(interaction) {

    // Eğer interaction değilse direkt çık
    if (!interaction || typeof interaction.isChatInputCommand !== "function") return;

    // Slash Commands
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);
      }
      return;
    }

    // Button Roles
    if (!interaction.isButton()) return;
    if (!interaction.customId.startsWith("role_")) return;

    const roleId = interaction.customId.split("_")[1];
    const role = interaction.guild.roles.cache.get(roleId);
    if (!role) return;

    const member = interaction.member;

    if (member.roles.cache.has(roleId)) {
      await member.roles.remove(roleId);
      await interaction.reply({ content: `➖ ${role.name} removed`, ephemeral: true });
    } else {
      await member.roles.add(roleId);
      await interaction.reply({ content: `➕ ${role.name} added`, ephemeral: true });
    }
  }
};
